import Layout from "components/organisms/Layout";
import { SaidBar, Navigator, Loader } from "components/molecules";
import "./index.scss";
import { useEffect, useState } from "react";
import { getAttendance } from "./_api";
import { AttendanceType } from "dto";
import ImagesFile from "assets/images";
import { Button, Image } from "components/atoms";
import IconsFile from "assets/icons";

const DailyCheckIn: React.FC = () => {
  type StreakPoints = {
    [dateStr: string]: number; // This allows indexing with a string to get a number
  };
  const [attendanceList, setAttendanceList] = useState<AttendanceType[]>([]);
  const [pending, setPending] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  useEffect(() => {
    async function fetchData() {
      try {
        setPending(true)
        const [data] = await getAttendance();
        setAttendanceList(data.items);
        setPending(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, []);
  const [streakPoints, setStreakPoints] = useState<StreakPoints>({});
  useEffect(() => {
    const calculatePoints = () => {
      let tempStreakPoints: StreakPoints = {};
      let lastPoint = 0;

      const sortedDailyCheck = attendanceList.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

      sortedDailyCheck.forEach(checkIn => {
        const date = new Date(checkIn.created_at);
        const dateStr = date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
        console.log(checkIn)
        // Calculate points based on consecutive days logic
        if (lastPoint < 50) lastPoint += 10;
        tempStreakPoints[dateStr] = checkIn.point;
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
    console.log("Yesterday: ", yesterday);
    console.log("Day Before Yesterday: ", dayBeforeYesterday);
    console.log("2 Days Before Yesterday: ", twoDaysBeforeYesterday);
    console.log("3 Days Before Yesterday: ", threeDaysBeforeYesterday);
    console.log("4 Days Before Yesterday: ", fourDaysBeforeYesterday);
  }, [attendanceList]);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[currentMonth];
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const lastDayOfWeek = new Date(currentYear, currentMonth, daysInMonth).getDay();
  const daysFromNextMonthToAdd = 6 - lastDayOfWeek; // Adjust if your calendar weeks start on a different day
  const dateFormatOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

  const calendarDays = [];
  function subtractDays(days: number): string {
    const date = new Date(today);
    date.setDate(date.getDate() - days);
    return date.toLocaleDateString('en-US', dateFormatOptions);
  }

  const yesterday = subtractDays(1);
  const dayBeforeYesterday = subtractDays(2);
  const twoDaysBeforeYesterday = subtractDays(3);
  const threeDaysBeforeYesterday = subtractDays(4);
  const fourDaysBeforeYesterday = subtractDays(5);


  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const todayStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; // Today's date string in YYYY-MM-DD format
    const isToday = dateStr === todayStr;
    const points = streakPoints[dateStr] || '50';
    calendarDays.push(
      <div key={day} className={`calendar-day ${isToday ? 'today' : ''}`}>
        <p className="day">{day}</p>
        <div className="daily_point">
          <p className="point">{points !== '50' ? `+${points}` : '+50'}</p>
          <p className="text">Missed</p>
          <Button className="more">{points !== '50' ? `${"Collected"}` : 'Collect'} </Button>
        </div>
      </div>
    );
  }
  for (let i = 0; i < daysFromNextMonthToAdd; i++) {
    calendarDays.push(<div key={`empty-${i}-${i}`} className="calendar-day empty"></div>);
  }

  return (
    <div>
      <Layout id="daily-check-in">
        <Navigator navigation="Reward / Daily Check-In" />
        <div className="daily_check">
          <SaidBar>
            {showCalendar && <div className="overly" onClick={() => setShowCalendar(false)}></div>}
            {pending ? <Loader /> : <div className="points_box">
              <div className={`calendar ${showCalendar && "show_calendar"} `}>
                <div className="date">
                  <p>{currentMonthName}</p>
                  <p>{currentYear}</p>

                </div>
                <div className="calendar-weekdays">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                    <div key={day} className="calendar-weekday">{day}</div>
                  ))}
                </div>
                <div className="calendar-grid">
                  {calendarDays}
                </div>
              </div>
              <div className="streak_calendar">
                <div className="top">
                  <div className="login_streak">
                    <Image src={ImagesFile.Like} alt="" className="like" />
                    <p>Login streak : 1 day</p>
                  </div>
                  <div className="check_in_calendar" onClick={() => setShowCalendar(true)}>
                    <Image src={IconsFile.Calendar} alt="" className="calendar_icon" />
                    <p className="text">my check-in calendar</p>
                  </div>
                </div>
                <div className="card_box">
                  {calendarDays.filter(day => !day.props.className.includes('empty'))}
                </div>
              </div>
            </div>}
          </SaidBar>
        </div>
      </Layout>
    </div>
  );
};

export default DailyCheckIn;
