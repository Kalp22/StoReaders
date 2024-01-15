import styles from "./dashboardCenter.module.css";

import StoryAlternate from "../cards/storyAlternate/storyAlternate";
import DashboardComments from "../cards/dashboardComments/dashboardComments";

export default function DashboardCenter() {
  return (
    <div className={styles.dashboard_center}>
      <div className={styles.component}>
        <div className={styles.titles}>Stories Read</div>
        <div className={styles.stories_cover}>
            <StoryAlternate />
            <StoryAlternate />
            <StoryAlternate />
            <StoryAlternate />
            <StoryAlternate /> 
        </div>
      </div>
      <div className={styles.component}>
        <div className={styles.titles}>Your Comments</div>
        <div>
            <DashboardComments />
            <DashboardComments />
            <DashboardComments />
        </div>
      </div>
    </div>
  );
}
