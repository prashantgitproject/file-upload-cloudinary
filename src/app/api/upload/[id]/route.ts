import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../utils/db.config";
import { ImageGallaryModel } from "../../../../utils/image-model";
import { DeleteImage } from "../../../../utils/upload-image";

ConnectDB();

export async function DELETE(req: NextRequest, ctx: {params: {id: string}}){

    const imagePublicId = `nextjs-imagegallary/` + ctx.params.id;

    const result_delete = await DeleteImage(imagePublicId)
    await ImageGallaryModel.findOneAndDelete({public_id: imagePublicId});

    return NextResponse.json({msg: result_delete}, {status: 200})
}