import conf from "../conf/conf.js";
import { Client, ID, Databases,Storage ,Query } from "appwrite";

export class Service{
    Client = new Client();
    Databases;
    bucket;
    constructor(){
        this.Client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId);
        this.Databases = new Databases(this.Client);
        this.bucket = new Storage(this.Client);
    }
    async createPost({title, slug, content, featuredImage, status, userId}){

        try {

            return await this.Databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status,
                userId
            }
            
         )  
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error",error);
        }
            
        
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        
        try {
            return await this.Databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status
            })
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }

    }
    async deletePost(slug){
        try {
            await this.Databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }

    }
    async getPost(slug){   
        try {
            return await this.Databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }

    }
    async getPosts(queries = [Query.equal("status","active")]){
            try {
                return await this.Databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
            }
           catch (error) {
                console.log("Appwrite serive :: getPosts :: error", error);
                return false
            }
   }         
    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file)
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }
    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
            
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }
    getFilePriview(fileId){
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId)
    }
}
const service = new Service()
export default Service;