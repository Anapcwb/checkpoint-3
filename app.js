const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Runanarun22",
  database: "playlist_db"
});

app.use(bodyParser.json()); // for parsing application/json

//app.get("/", (req, res) => res.send("Hello World!"));

const getPlaylist = (req, res) => {
  connection.query(
    "SELECT * FROM playlist WHERE id = ?",
    [req.params.id],
    function(err, rows, fields) {
      if (err) {
        res.json(err);
      }
      if (rows.length === 0) {
        res.sendStatus(404);
      }
      res.json(rows[0]);
    }
  );
};

app.get("/playlist/:id", getPlaylist);

app.post("/playlist", function(req, res) {
  connection.query(
    "INSERT INTO playlist SET title = ?, genre = ?",
    [req.body.title, req.body.genre],
    function(err, rows, fields) {
      if (err) {
        res.json(err);
      }
      getPlaylist({ params: { id: rows.insertId } }, res);
    }
  );
});

app.put("/playlist/:id", function(req, res) {
  connection.query(
    "UPDATE playlist SET title = ?, genre = ? WHERE id = ?",
    [req.body.title, req.body.genre, req.params.id],
    function(err, rows, fields) {
      if (err) {
        res.json(err);
      }
      getPlaylist(req, res);
    }
  );
});

app.delete("/playlist/:id", function(req, res) {
  connection.query(
    "DELETE FROM playlist WHERE id = ?",
    [req.params.id],
    function(err, rows, fields) {
      if (err) {
        res.json(err);
      }
      if (rows.length === 0) {
        res.sendStatus(404);
      }
      res.sendStatus(200);
    }
  );
});

app.get("/playlist/:id/track", function(req, res) {
  connection.query(
    "SELECT * FROM track WHERE playlist_id = ?",
    [req.params.id],
    function(err, rows, fields) {
      if (err) {
        res.json(err);
      }
      if (rows.length === 0) {
        res.sendStatus(404);
      }
      res.json(rows);
    }
  );
});

const getTrack = (req, res) => {
  connection.query(
    "SELECT * FROM track WHERE id = ?",
    [req.params.id],
    function(err, rows, fields) {
      if (err) {
        res.json(err);
      }
      if (rows.length === 0) {
        res.sendStatus(404);
      }
      res.json(rows[0]);
    }
  );
};

app.post("/track", function(req, res) {
  connection.query(
    "INSERT INTO track SET title = ?, artist = ?, album_picture = ?, youtube_url = ?, playlist_id = ?",
    [
      req.body.title,
      req.body.artist,
      req.body.album_picture,
      req.body.youtube_url,
      req.body.playlist_id
    ],
    function(err, rows, fields) {
      if (err) {
        res.json(err);
      }
      getTrack({ params: { id: rows.insertId } }, res);
    }
  );
});

app.put("/track/:id", function(req, res) {
  connection.query(
    "UPDATE track SET title = ?, artist = ?, album_picture = ?, youtube_url = ? WHERE id = ?",
    [
      req.body.title,
      req.body.artist,
      req.body.album_picture,
      req.body.youtube_url,
      req.params.id
    ],
    function(err, rows, fields) {
      if (err) {
        res.json(err);
        return;
      }
      getTrack(req, res);
    }
  );
});

app.delete("/track/:id", function(req, res) {
  connection.query("DELETE FROM track WHERE id = ?", [req.params.id], function(
    err,
    rows,
    fields
  ) {
    if (err) {
      res.json(err);
    }
    if (rows.length === 0) {
      res.sendStatus(404);
    }
    res.sendStatus(200);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
