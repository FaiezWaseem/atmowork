const Chat = require('../models/ChatModel');

const NotificationModel = require('../models/NotificationModel');
const ProjectModel = require('../models/ProjectModel');

class ChatController {


    async addMessage(req, res , io) {
        try {

            const projectId =  req.params.chatid;
            const project = await ProjectModel.findById(projectId).populate(['members' , 'creatorid']);

            let message = await Chat.create({ ...req.body, creatorid: req.user , project_id : req.params.chatid });
            message = await Chat.findById(message._id).populate('creatorid');
            if(io){
                io.emit(`${req.params.chatid}-new-message`, JSON.stringify(message));
            }

            project.members.forEach(async (member) => {
                if(member._id.toString()!== req.user.toString()){
                    await NotificationModel.create({
                        user: member._id,
                        title: `You have a new message from ${project?.creatorid?.username} From Project ${project.title}`,
                        description : `${req.body.message}`,
                    })
        
                }
            })

            res.status(200).json({ message: 'Message Sent', "success": true, })
        } catch (error) {
            res.status(404).json({ message: error.message, "success": false })
        }
    }
    async getMessages(req, res) {
        try {
            const messages = await Chat.find({ project_id: req.params.chatid })
            .populate('creatorid')
            res.status(200).json({ message: 'Messages Retrieved', "success": true, messages });
        } catch (error) {
            res.status(404).json({ message: error.message, "success": false })
        }
    }
    async removeMessage(req, res , io) {
        try {
            const message = await Chat.findOneAndDelete({ _id: req.params.messageid, creatorid: req.user });
            if (!message) {
                return res.status(404).json({ message: 'Message Not Found', "success": false })
            }
            if(io){
                io.emit(`chat-remove-message`, JSON.stringify(message));
            }
            res.status(200).json({ message: 'Message Deleted', "success": true, message });
        }catch (error) {
            res.status(404).json({ message: error.message, "success": false })
        }
    }
}



module.exports = new  ChatController;