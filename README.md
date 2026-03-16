# KJV Bible JSON Viewer

This project provides a simple **web-based viewer for the King James Version (KJV) Bible** using JSON files for all **66 books** of Scripture.

The site loads each book dynamically and supports:

- chapter navigation
- verse anchors
- direct verse linking
- simple GitHub Pages hosting

Example verse link:

```
?book=John#john-3-16
```

This will load the Gospel of John and scroll directly to **John 3:16**.

---

# Opening the Viewer

### Local development

Run a local server:

```
python3 -m http.server 8000
```

Then open:

```
http://localhost:8000/?book=Genesis
```

---

### GitHub Pages

Once deployed, open:

```
https://YOUR-USERNAME.github.io/YOUR-REPO/?book=Genesis
```

---

# Old Testament

| Book            | Chapters | Link                                       |
| --------------- | -------- | ------------------------------------------ |
| Genesis         | 50       | [?book=Genesis](?book=Genesis)             |
| Exodus          | 40       | [?book=Exodus](?book=Exodus)               |
| Leviticus       | 27       | [?book=Leviticus](?book=Leviticus)         |
| Numbers         | 36       | [?book=Numbers](?book=Numbers)             |
| Deuteronomy     | 34       | [?book=Deuteronomy](?book=Deuteronomy)     |
| Joshua          | 24       | [?book=Joshua](?book=Joshua)               |
| Judges          | 21       | [?book=Judges](?book=Judges)               |
| Ruth            | 4        | [?book=Ruth](?book=Ruth)                   |
| 1 Samuel        | 31       | [?book=1Samuel](?book=1Samuel)             |
| 2 Samuel        | 24       | [?book=2Samuel](?book=2Samuel)             |
| 1 Kings         | 22       | [?book=1Kings](?book=1Kings)               |
| 2 Kings         | 25       | [?book=2Kings](?book=2Kings)               |
| 1 Chronicles    | 29       | [?book=1Chronicles](?book=1Chronicles)     |
| 2 Chronicles    | 36       | [?book=2Chronicles](?book=2Chronicles)     |
| Ezra            | 10       | [?book=Ezra](?book=Ezra)                   |
| Nehemiah        | 13       | [?book=Nehemiah](?book=Nehemiah)           |
| Esther          | 10       | [?book=Esther](?book=Esther)               |
| Job             | 42       | [?book=Job](?book=Job)                     |
| Psalms          | 150      | [?book=Psalms](?book=Psalms)               |
| Proverbs        | 31       | [?book=Proverbs](?book=Proverbs)           |
| Ecclesiastes    | 12       | [?book=Ecclesiastes](?book=Ecclesiastes)   |
| Song of Solomon | 8        | [?book=SongofSolomon](?book=SongofSolomon) |
| Isaiah          | 66       | [?book=Isaiah](?book=Isaiah)               |
| Jeremiah        | 52       | [?book=Jeremiah](?book=Jeremiah)           |
| Lamentations    | 5        | [?book=Lamentations](?book=Lamentations)   |
| Ezekiel         | 48       | [?book=Ezekiel](?book=Ezekiel)             |
| Daniel          | 12       | [?book=Daniel](?book=Daniel)               |
| Hosea           | 14       | [?book=Hosea](?book=Hosea)                 |
| Joel            | 3        | [?book=Joel](?book=Joel)                   |
| Amos            | 9        | [?book=Amos](?book=Amos)                   |
| Obadiah         | 1        | [?book=Obadiah](?book=Obadiah)             |
| Jonah           | 4        | [?book=Jonah](?book=Jonah)                 |
| Micah           | 7        | [?book=Micah](?book=Micah)                 |
| Nahum           | 3        | [?book=Nahum](?book=Nahum)                 |
| Habakkuk        | 3        | [?book=Habakkuk](?book=Habakkuk)           |
| Zephaniah       | 3        | [?book=Zephaniah](?book=Zephaniah)         |
| Haggai          | 2        | [?book=Haggai](?book=Haggai)               |
| Zechariah       | 14       | [?book=Zechariah](?book=Zechariah)         |
| Malachi         | 4        | [?book=Malachi](?book=Malachi)             |

---

# New Testament

| Book            | Chapters | Link                                         |
| --------------- | -------- | -------------------------------------------- |
| Matthew         | 28       | [?book=Matthew](?book=Matthew)               |
| Mark            | 16       | [?book=Mark](?book=Mark)                     |
| Luke            | 24       | [?book=Luke](?book=Luke)                     |
| John            | 21       | [?book=John](?book=John)                     |
| Acts            | 28       | [?book=Acts](?book=Acts)                     |
| Romans          | 16       | [?book=Romans](?book=Romans)                 |
| 1 Corinthians   | 16       | [?book=1Corinthians](?book=1Corinthians)     |
| 2 Corinthians   | 13       | [?book=2Corinthians](?book=2Corinthians)     |
| Galatians       | 6        | [?book=Galatians](?book=Galatians)           |
| Ephesians       | 6        | [?book=Ephesians](?book=Ephesians)           |
| Philippians     | 4        | [?book=Philippians](?book=Philippians)       |
| Colossians      | 4        | [?book=Colossians](?book=Colossians)         |
| 1 Thessalonians | 5        | [?book=1Thessalonians](?book=1Thessalonians) |
| 2 Thessalonians | 3        | [?book=2Thessalonians](?book=2Thessalonians) |
| 1 Timothy       | 6        | [?book=1Timothy](?book=1Timothy)             |
| 2 Timothy       | 4        | [?book=2Timothy](?book=2Timothy)             |
| Titus           | 3        | [?book=Titus](?book=Titus)                   |
| Philemon        | 1        | [?book=Philemon](?book=Philemon)             |
| Hebrews         | 13       | [?book=Hebrews](?book=Hebrews)               |
| James           | 5        | [?book=James](?book=James)                   |
| 1 Peter         | 5        | [?book=1Peter](?book=1Peter)                 |
| 2 Peter         | 3        | [?book=2Peter](?book=2Peter)                 |
| 1 John          | 5        | [?book=1John](?book=1John)                   |
| 2 John          | 1        | [?book=2John](?book=2John)                   |
| 3 John          | 1        | [?book=3John](?book=3John)                   |
| Jude            | 1        | [?book=Jude](?book=Jude)                     |
| Revelation      | 22       | [?book=Revelation](?book=Revelation)         |

---

# Verse Linking

You can link directly to any verse:

```
?book=John#john-3-16
?book=Genesis#genesis-1-1
?book=Romans#romans-10-9
```

Example Markdown link:

```
[John 3:16](?book=John#john-3-16)
```

---

# License

Public domain text of the King James Bible.
