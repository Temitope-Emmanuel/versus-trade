import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const sendFCMMessage = functions.https.onCall(async (data, context) => {
  try {
    let token = ""
    if(!data.token){
      const tokenRef = await admin.firestore().collection("fcmToken").doc(data.userId).get()
      if(!tokenRef.exists){
        return({
          status:404,
          message:"Unable to get a user token to send notification"
        })
      }else{
        token = tokenRef.data()?.token
      }
    }else{
      token = data.token
    }
    const message = {
      data: {
        payload: data.payload || "",
      },
      notification: {
        title: data.title,
        body: `Hello ${data.username}, ${data.body}`,
      },
      // webpush: {
      //   headers: {
      //     Urgency: "high",
      //   },
      // },
      token
    };

    // Send to all admin 
    const sendToAdminRef = await admin.firestore().collection("fcmToken").where("role","==","admin").get()
    const adminToken:string[] = []
    sendToAdminRef.forEach(item => {
      adminToken.push(item.data()?.token)
    })

    functions.logger.info(
      "This is the message",
      JSON.stringify(message, null, 2)
    );
    return admin
      .messaging()
      .send(message as any)
      .then(async (response) => {
        if(data.token){
          await admin.firestore().collection("fcmToken").doc(data.userId).update({
            token:token
          })
        }
        const adminMessage = {
          data: {
            payload: data.payload || "",
          },
          notification: {
            title: `Alert:${data.title}`,
            body: `User ${data.username}, ${data.body}`,
          },
          // webpush: {
          //   headers: {
          //     Urgency: "high",
          //   },
          // },
          tokens:adminToken
        };
        admin.messaging().sendMulticast(adminMessage).then(payload => {

        }).catch(err => {
          functions.logger.warn("err", JSON.stringify(err, null, 2));      
        })
        return {
          status: 200,
          message: "Message Sent successful",
          data: response,
        };
      });
  } catch (err) {
    functions.logger.warn("err", JSON.stringify(err, null, 2));
    throw new functions.https.HttpsError("unknown", err.message, err);
  }
});
