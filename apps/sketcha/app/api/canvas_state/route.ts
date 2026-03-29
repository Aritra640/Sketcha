import { NextResponse } from "next/server";

export async function Get(request: Request) {
  //get all shapes of the current canvas;
  try{

  }catch(err) {
    console.error("Error in getting canvas state: ", err);
    return NextResponse.json({}, {status: 500});
  }
}
