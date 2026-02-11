import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { Photo } from "./entity/Photo"
import { PhotoMetadata } from "./entity/PhotoeMetadata";
import { Author } from "./entity/Author";

AppDataSource.initialize().then(async () => {
    const photoRepository = AppDataSource.getRepository(Photo);
    const photometadatarepository = AppDataSource.getRepository(PhotoMetadata);
    const authorRepository = AppDataSource.getRepository(Author);


    // Cascading the child object gets enterd on its own when we gave cascading true   



    //     const photo = new Photo()
    //     photo.name = "Me and Bears"
    //     photo.description = "I am near polar bears"
    //     photo.filename = "photo-with-bears.jpg"
    //     photo.isPublished = true

    //     // create photo metadata object
    //     const metadata = new PhotoMetadata()
    //     metadata.height = 640
    //     metadata.width = 480
    //     metadata.compressed = true
    //     metadata.comment = "cybershoot"
    //     metadata.orientation = "portrait"

    //     photo.metadata = metadata;

    //    await photoRepository.save(photo);

    //    const photoselected = await photoRepository.findOne({where : {id:photo.id},relations : {metadata: true}});
    //    console.log(photoselected);

    const author = new Author()
    author.name = "Jenish Shah"







    const photo = new Photo()
    photo.name = "Me and Bears"
    photo.description = "I am near polar bears"
    photo.filename = "photo-with-bears.jpg"
    photo.isPublished = true



    // create photo metadata object
    const metadata = new PhotoMetadata()
    metadata.height = 640
    metadata.width = 480
    metadata.compressed = true
    metadata.comment = "cybershoot"
    metadata.orientation = "portrait"

    photo.metadata = metadata;
    photo.author = author;

    photoRepository.save(photo);


    const authorWithPhotos = await authorRepository.findOne({
        where: { id: author.id },
        relations: {
            photos: true
        }
    });

    console.log(authorWithPhotos);


}).catch(error => console.log(error))




