import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch("https://api.jsonserve.com/Uw5CrX", {
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch quiz data");
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching data", error);
        return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
    }
}
