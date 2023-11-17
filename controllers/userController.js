


// const authController = {
//     async register(req, res){

//     },
//     async login (req, res){
//         const email = req.body.email;
//         const password = req.body.password;
//         const user = await User.findOne({email:email})
//         if(user){
//             const result = password === user.password
//             if(result){
//                 res.redirect('/home')
//             }else{
//                 res.render('login', {errorMessage: 'invalid password'})
//             }
//         }else{
//             res.render('login', {errorMessage: 'user not found'})
//         }
//     }
// }

// module.exports = authController