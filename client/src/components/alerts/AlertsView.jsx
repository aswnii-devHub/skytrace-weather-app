import React from "react";
import AlertCentre from "../AlertCentre.jsx";
import SafetyGuide from "../SafetyGuide.jsx";

export default function AlertsView({ alerts, place, notificationsOn, enableNotifications }) {
  return (
<>
            <AlertCentre
              data={alerts}
              place={place}
              notificationsOn={notificationsOn}
              onEnableNotifications={enableNotifications}
            />
            <SafetyGuide />
          </>
  );
}
