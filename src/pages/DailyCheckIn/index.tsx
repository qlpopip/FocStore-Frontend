import Layout from "components/organisms/Layout";
import { SaidBar, Navigator } from "components/molecules";
import "./index.scss";
import { useEffect, useState } from "react";


const dailyCheck = [
  {
    created_at: "2024-02-11 17:27:00.107193",
    checked: true,
    point: 10
  },
  {
    created_at: "2024-02-12 17:27:00.107193",
    checked: true,
    point: 20
  },
  {
    created_at: "2024-02-13 17:27:00.107193",
    checked: true,
    point: 30
  },
  {
    created_at: "2024-02-14 17:27:00.107193",
    checked: true,
    point: 40
  },
  {
    created_at: "2024-02-15 17:27:00.107193",
    checked: true,
    point: 50
  },
  {
    created_at: "2024-02-16 17:27:00.107193",
    checked: true,
    point: 50
  },
  {
    created_at: "2024-02-17 17:27:00.107193",
    checked: true,
    point: 50
  },
  {
    created_at: "2024-02-18 17:27:00.107193",
    checked: true,
    point: 50
  },
  {
    created_at: "2024-02-19 17:27:00.107193",
    checked: true,
    point: 50
  },
  {
    created_at: "2024-02-21 17:27:00.107193",
    checked: true,
    point: 10
  },
  {
    created_at: "2024-02-22 17:27:00.107193",
    checked: true,
    point: 20
  },
  {
    created_at: "2024-02-23 17:27:00.107193",
    checked: true,
    point: 30
  },
  {
    created_at: "2024-02-24 17:27:00.107193",
    checked: true,
    point: 40
  },
  {
    created_at: "2024-02-25 17:27:00.107193",
    checked: true,
    point: 50
  },
  {
    created_at: "2024-02-26 17:27:00.107193",
    checked: true,
    point: 50
  }
]

const DailyCheckIn: React.FC = () => {
  type StreakPoints = {
    [dateStr: string]: number; // This allows indexing with a string to get a number
  };

  const [streakPoints, setStreakPoints] = useState<StreakPoints>({});

  useEffect(() => {
    const calculatePoints = () => {
      let tempStreakPoints: StreakPoints = {};
      let lastPoint = 0; // Track last day's points to calculate today's points

      // Sort dailyCheck by date
      const sortedDailyCheck = dailyCheck.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

      sortedDailyCheck.forEach(checkIn => {
        const date = new Date(checkIn.created_at);
        const dateStr = date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format

        // Calculate points based on consecutive days logic
        if (lastPoint < 50) lastPoint += 10;
        tempStreakPoints[dateStr] = lastPoint;

        // Reset points if a day is missed
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        const nextDayStr = nextDay.toISOString().split('T')[0];
        if (!sortedDailyCheck.find(d => new Date(d.created_at).toISOString().split('T')[0] === nextDayStr)) {
          lastPoint = 0; // Reset for next streak
        }
      });

      setStreakPoints(tempStreakPoints);
    };

    calculatePoints();
  }, []);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const points = streakPoints[dateStr] || 'X'; // Use 'X' or any indicator for days without check-in

    calendarDays.push(
      <div key={day} className="calendar-day">
        <p>{day}</p>
        <h3 className="daily_point">{points !== 'X' ? `+${points}` : 'X'}</h3>
      </div>
    );
  }

  return (
    <div>
      <Layout id="daily-check-in">
        <Navigator navigation="Reward / Daily Check-In" />
        <div className="daily_check">
          <SaidBar>
            <div className="points_box">
              <div className="calendar">
                <div className="calendar-weekdays">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                    <div key={day} className="calendar-weekday">{day}</div>
                  ))}
                </div>
                <div className="calendar-grid">
                  {calendarDays}
                </div>
              </div>
            </div>
          </SaidBar>
        </div>
      </Layout>
    </div>
  );
};

export default DailyCheckIn;
