import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { caseType, caseNumber, year, state, district, courtLevel } = await req.json();

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (!caseNumber || !year) {
      return new Response(
        JSON.stringify({
          error: "Missing required parameters",
          message: "Case number and year are required"
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const caseTypeCode = caseType.split(' ')[0];
    const formattedCaseNumber = `${caseTypeCode}/${caseNumber}/${year}`;

    const mockCaseData = {
      caseDetails: {
        caseNumber: formattedCaseNumber,
        petitioner: "Rajesh Kumar Singh",
        respondent: "State of India & Ors.",
        filingDate: `${year}-03-15`,
        nextHearing: "2025-12-05",
        courtNumber: "Court Room 7",
        status: "Active",
        judge: `Hon'ble Justice ${state === 'Delhi' ? 'Vipin Sanghi' : 'Rajendra Kumar'}`,
        court: `${state} ${courtLevel}`,
        state: state,
        district: district,
        courtLevel: courtLevel,
        caseType: caseType,
      },
      judgments: [
        {
          type: "Final Order",
          date: `${year}-10-22`,
          url: "#",
          fileName: `order_${formattedCaseNumber.replace(/\//g, '_')}.pdf`,
        },
        {
          type: "Interim Order",
          date: `${year}-07-18`,
          url: "#",
          fileName: `interim_order_${formattedCaseNumber.replace(/\//g, '_')}.pdf`,
        },
        {
          type: "Notice",
          date: `${year}-04-10`,
          url: "#",
          fileName: `notice_${formattedCaseNumber.replace(/\//g, '_')}.pdf`,
        },
      ],
      caseHistory: [
        {
          date: `${year}-03-15`,
          event: "Case Filed",
          description: "Petition filed and admitted for hearing",
        },
        {
          date: `${year}-04-10`,
          event: "Notice Issued",
          description: "Notice issued to respondents",
        },
        {
          date: `${year}-07-18`,
          event: "Interim Order",
          description: "Interim relief granted",
        },
        {
          date: `${year}-10-22`,
          event: "Final Hearing",
          description: "Final arguments concluded",
        },
      ],
    };

    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    const { error: dbError } = await supabase
      .from("case_queries")
      .insert({
        case_type: caseType,
        case_number: caseNumber,
        year: year,
        state: state,
        district: district,
        court_level: courtLevel,
        raw_response: mockCaseData,
        ip_address: clientIp,
        status: "success",
      });

    if (dbError) {
      console.error("Database error:", dbError);
    }

    return new Response(JSON.stringify(mockCaseData), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing request:", error);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (supabaseUrl && supabaseServiceKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        await supabase
          .from("case_queries")
          .insert({
            case_type: "unknown",
            case_number: "error",
            year: "error",
            state: "unknown",
            court_level: "unknown",
            raw_response: { error: error.message },
            status: "error",
          });
      } catch (logError) {
        console.error("Failed to log error:", logError);
      }
    }

    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error.message || "Failed to fetch case data"
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});