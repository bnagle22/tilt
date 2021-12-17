import { Profile } from '../models/profile.js'
import { Post } from '../models/post.js'

const create = async (req, res) => {
  try {
    console.log("whatever you want")
    req.body.added_by = req.user.profile
    const post = await new Post(req.body)
    await post.save()
    await Profile.updateOne(
      { _id: req.user.profile },
      { $push: { posts: post } }
    )
    return res.status(201).json(post)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('added_by')
      .sort({ createdAt: 'desc' })
    return res.status(200).json(posts)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('added_by')
      .populate('author')
    return res.status(200).json(post)
  } catch (err) {
    return res.status(500).json(err)
  }
}



export {
    create,
    index,
    show,
}