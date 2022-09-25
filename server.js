const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");

const expressHBS = require("express-handlebars");
const handlebars = expressHBS.create({helpers});

const session = require("express-session");
const { use } = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const blog = {
    store: new SequelizeStore ({
        db: sequelize
    })
};

app.use(session(blog));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app/use(express.static(path.join(__dirname, "public")));


app.engine("handlebars", handlebars.engine);

app.user(routes);

sequelize.sync({ force:false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
})