
import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../utils/db.config";
import { ImageGallaryModel } from "../../../utils/image-model";
import { UploadImage } from "../../../utils/upload-image";

// export async function GET(){
//     const client = new MongoClient(process.env.MONGO_URL);
//     client.connect();
//     const db = client.db('mernstack');
//     const collection = db.collection('users');
//     const id = '654914fe10233e2d47256ce6'
//     const user = await collection.findOne({_id: new ObjectId(id)})
//     return Response.json(user)
// }

ConnectDB();

export async function GET(req: NextRequest){
    const Images = await ImageGallaryModel.find({});

    return NextResponse.json({images: Images, total: Images.length}, {status: 200})
}

export async function POST(req: NextRequest){
    const formData = await req.formData();

    const image = formData.get('image') as unknown as File;
    const data:any = await UploadImage(image, 'nextjs-imagegallary');

    await ImageGallaryModel.create({
        image_url: data?.secure_url,
        public_id: data?.public_id
    })

    return NextResponse.json({msg: data}, {status: 200});
}