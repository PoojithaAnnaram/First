import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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
    const { caseType, caseNumber, year, court } = await req.json();

    const mockCaseData = {
      caseDetails: {
        caseNumber: `${caseType.split(' ')[0]}/${caseNumber}/${year}`,
        petitioner: "Sample Petitioner Name",
        respondent: "Sample Respondent Name",
        filingDate: "2024-01-15",
        nextHearing: "2025-11-20",
        courtNumber: "Court Room 5",
        status: "Active",
        judge: "Hon'ble Justice Sample Name",
        court: court,
      },
      judgments: [
        {
          type: "Order",
          date: "2024-08-10",
          url: "#",
          fileName: "order_10082024.pdf",
        },
        {
          type: "Interim Order",
          date: "2024-06-15",
          url: "#",
          fileName: "interim_order_15062024.pdf",
        },
      ],
    };

    return new Response(JSON.stringify(mockCaseData), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
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
