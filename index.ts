import express from "express";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));
app.set('view engine', 'hbs');

app.get('/', (_, res) => {
  res.render('index');
})

app.listen(port, () => {
  console.info(`Server started at port ${port}`);
});

export default app;
