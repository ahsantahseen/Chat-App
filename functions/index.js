const functions = require("firebase-functions");

const Filter = require("bad-words");
const admin = require("firebase-admin");
admin.initializeApp();

const database = admin.firestore();

exports.detectBadUsers = functions.firestore
  .document("messages/{msgId}")
  .onCreate(async (doc, ctx) => {
    const filter = new Filter();
    const { txt, uid } = doc.data();
    if (filter.isProfane(txt)) {
      const cleaned = filter.clean(txt);
      await doc.ref.update({
        txt: `Omg! I have been banned for saying...  ${cleaned}`,
      });
      await database.collection("banned").doc(uid).set({});
    }
  });
