module.exports = (app) => {
    require('./routes/profile')(app);
    require('./routes/register')(app);
    require('./routes/home')(app);
    require('./routes/users')(app);
    require('./routes/login')(app);
}