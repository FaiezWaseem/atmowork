const Chat = require('../models/ChatModel');



class ChatController {

    async addMessage(req, res) {
        try {
            const message = await Chat.create({ ...req.body, creatorid: req.user , project_id : req.params.chatid });
            res.status(200).json({ message: 'Message Sent', "success": true, })
        } catch (error) {
            res.status(404).json({ message: error.message, "success": false })
        }
    }
    async getMessages(req, res) {
        try {
            const messages = await Chat.find({ chatid: req.params.chatid }).sort({ createdAt: -1 });
            res.status(200).json({ message: 'Messages Retrieved', "success": true, messages });
        } catch (error) {
            res.status(404).json({ message: error.message, "success": false })
        }
    }
    async removeMessage(req, res) {
        try {
            const message = await Chat.findOneAndDelete({ _id: req.params.messageid, creatorid: req.user });
            if (!message) {
                return res.status(404).json({ message: 'Message Not Found', "success": false })
            }
            res.status(200).json({ message: 'Message Deleted', "success": true, message });
        }catch (error) {
            res.status(404).json({ message: error.message, "success": false })
        }
    }
}



module.exports = new ChatController;