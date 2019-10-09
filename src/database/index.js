const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

//fazer a conexao com o MongoDB utilizando o mongoose
mongoose.connect('mongodb+srv://<Username>:<Password>@cluster0-eqwcn.mongodb.net/test?retryWrites=true&w=majority', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

mongoose.Promise = global.Promise;

module.exports = mongoose;