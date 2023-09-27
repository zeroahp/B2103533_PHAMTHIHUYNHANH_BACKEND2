const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const ContactService = require("../services/contact.service");

//create and save a new Contact
exports.create = async (req, res, next) => {
    if(!req.body?.name){
        return next(new ApiError(400, "Name can not be empty"));
    }
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);

    }catch(err){
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
}

exports.findAll =  async(req, res, next) => {
    let documents = [] ;

    try{
        const contactServer = new ContactService(MongoDB.client);
        const {name} = req.query;
        if(name) {
            documents = await contactServer.findByName(name);
        }else{
            documents = await contactServer.find({});
        }
    } catch(err) {
        return next (
            new ApiError(500, "An error occurred while retrieving contacts")
        )
    }

    return res.send(documents);
};

exports.findOne = async(req, res, next) => {
    try{
        const contactServer = new ContactService(MongoDB.client);
        const document = await contactServer.findById(req.params.id);

        if(!document) {
            return next (new ApiError(400, "Contact not found"));

        }    
        return res.send(document);

    } catch(err) {
        return next (
            new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
        )
    }
};

exports.update = async(req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next (new ApiError(400, "Data to update can not be empty"));
    }
    
    try{
        const contactServer = new ContactService(MongoDB.client);
        const document = await contactServer.update(req.params.id, req.body);
        
        if(!document) {
            return next (new ApiError(400, "Contact not found"));
        }    
        return res.send({
            message: "Contact was update successfully"
        });
        
    }catch(err){
        return next (
            new ApiError(500, `Error update contact with id=${req.params.id}`)
        );
    }
};

exports.delete = async(req, res, next) => {
    
    try{
        const contactServer = new ContactService(MongoDB.client);
        const document = await contactServer.delete(req.params.id);
        console.log(document);
        
        if(!document) {
            // return next (new ApiError(400, "Contact not found"));
            return res.status(400).json({ message: "Contact not found" });

        }    
        // return res.send({message: "Contact was delete successfully"});
        return res.status(200).json({ message: "Contact was deleted successfully" });
        
    } catch(err) {
        return next (
            new ApiError(500, `Could not delete contact with id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async(req, res, next) => {
    try{
        const contactServer = new ContactService(MongoDB.client);
        const deletedCount = await contactServer.deleteAll();
        return res.send(
            {
                message: `${deletedCount} contacts were deleted successfully`
            }
        );
        
    }catch(err){
        return next (
            new ApiError(500, `An error occurred while removing all contacts`)
        );
    }
};

exports.findAllFavorite = async(req, res, next) => {
    try{
        const contactServer = new ContactService(MongoDB.client);
        const document = await contactServer.findFavorite();
        console.log(document);
        return res.send(document);
        
    }catch(err){
        return next (
            new ApiError(500, `An error occurred while retrieving favorite contacts`)
        );
    }
};

