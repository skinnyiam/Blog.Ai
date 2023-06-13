import { prisma } from "../../client";
import { NextResponse } from "next/server";
type Params = {
  params: { id: string };
};
export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const { title, content } = await request.json();
    const post = await prisma.post.update({
      where: { id: id },
      data: { title, content },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log(error);
    NextResponse.json({ error }, { status: 500 });
  }
}
