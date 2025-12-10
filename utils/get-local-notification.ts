import * as Notifications from "expo-notifications";

export async function scheduleNotificationHandler() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Permission to send notifications was denied!");
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail!",
      body: "Hello from your dashboard!",
      sound: true, // enables default sound
      data: { screen: "Dashboard" },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
    },
  });

  //  alert("Notification scheduled in 2 seconds!");
}
