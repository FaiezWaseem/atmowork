const ProjectModel = require('../models/ProjectModel')
const FeatureModel = require('../models/featuresModel')
const UserModel = require('../models/UserModel')

let plansFeature = {
    'Hobby': {
        projects: 10,
        team: 0
    },
    'Standard': {
        projects: 10,
        team: 5
    },
    'Premium': {
        projects: 50,
        team: -1
    },
}

class ProjectController {



    async getProjects(req, res) {
        try {
            const projects = await ProjectModel.find({ creatorid: req.user }).populate(['creatorid', 'members', 'features']).sort('asc');
            res.json({ status: true, projects })
        } catch (error) {
            res.json({ status: false, message: error.message })
        }
    }
    async createProject(req, res) {
        try {
            const user = await UserModel.findOne({ _id: req.user }, { password: 0 }).populate('membership_plan_id');
            if (user) {
                const total_allowed_project = plansFeature[user.account_membership].projects;

                const existingProjectsCount = await ProjectModel.countDocuments({ creatorid: req.user });

                console.log({total_allowed_project, existingProjectsCount})

                if (existingProjectsCount >= total_allowed_project) {
                    res.json({ status: false, message: `You have reached the maximum number of allowed projects on ${user.account_membership} PLAN. please upgrade to premium plan to add more projects.` });
                } else {
                    const project = await ProjectModel.create({ ...req.body, creatorid: req.user });
                    res.json({ status: true, project });
                }
            }
        } catch (error) {
            res.json({ status: false, message: error.message })
        }
    }
    async updateProject(req, res) {

    }
    async deleteProject(req, res) {
        try {
            const result = await ProjectModel.deleteOne({ _id: req.params.id, creatorid: req.user });
            console.log(result)
            res.json({
                status: result.deletedCount ? true : false,
                message: result.deletedCount ? 'Project Deleted' : 'Failed To Delete'
            })
        } catch (error) {
            res.json({
                status: false,
                message: error.message
            })
        }
    }

    async createFeature(req, res) {
        try {
            const feature = await FeatureModel.create({ ...req.body, creatorid: req.user });
            res.json({ status: true, feature })
        } catch (error) {
            res.json({
                status: false,
                message: error.message
            })
        }
    }
    async getFeatures(req, res) {
        try {
            const features = await FeatureModel.find({ project_id: req.params.projectid })
            res.json({ status: true, features })
        } catch (error) {
            res.json({
                status: false,
                message: error.message
            })
        }
    }
    async updateFeature(req, res) {
        try {
            const response = await FeatureModel.updateOne({ _id: req.params.id, creatorid: req.user }, { $set: req.body }, { new: true });
            console.log(response);
            res.json({ status: true, message: 'updated ', response })
        } catch (error) {

        }
    }
    async deleteFeature(req, res) {
        try {
            const result = await FeatureModel.deleteOne({ _id: req.params.id, creatorid: req.user });
            console.log(result)
            res.json({
                status: result.deletedCount ? true : false,
                message: result.deletedCount ? 'Feature Deleted' : 'Failed To Delete'
            })
        } catch (error) {
            res.json({
                status: false,
                message: error.message
            })
        }
    }

}

module.exports = new ProjectController();