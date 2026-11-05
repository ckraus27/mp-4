import {NextResponse} from "next/server";

export async function GET(req: Request){
    const {searchParams} = new URL(req.url);
    const city = searchParams.get("city") ?? "Boston";

    const api_key = process.env.WEATHER_API_KEY;

    if (!api_key) {
        return NextResponse.json(
            {error: "API key missing"},
            {status: 500}
        );
    }

    try {
        const upStream = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=us&include=current&key=${api_key}&contentType=json`,
            {cache: "no-store"}
        );

        if(!upStream.ok){
            return NextResponse.json(
                {error: "Weather API failed"},
                {status: 502}
            );
        }

        const data = await upStream.json()

        return NextResponse.json(data);
    } catch{
        return NextResponse.json({error: "Weather unavailable"}, {status: 500});
    }
}