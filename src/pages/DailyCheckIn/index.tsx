import Layout from "components/organisms/Layout";
import { SaidBar, Navigator, Loader } from "components/molecules";
import "./index.scss";
import { useEffect, useState, useRef } from "react";
import { createAttendance, getAttendance, getStreak } from "./_api";
import { AttendanceType } from "dto";
import ImagesFile from "assets/images";
import { Button, Image } from "components/atoms";
import IconsFile from "assets/icons";

const DailyCheckIn: React.FC = () => {
  type StreakPoints = {
    [dateStr: string]: number;
  };
  const todayRef = useRef<HTMLDivElement>(null);
  const [attendanceList, setAttendanceList] = useState<AttendanceType[]>([]);
  const [pending, setPending] = useState(false)
  const [loginStreak, setLoginStreak] = useState(0)
  const [showCalendar, setShowCalendar] = useState(false)
  async function fetchData() {
    try {
      setPending(true)
      const [data] = await getAttendance();
      const res = await getStreak()
      setLoginStreak(res[0].item)
      setAttendanceList(data.items);
      setPending(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
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
    if (todayRef.current) {
      // Scroll the container to show today's element
      // Adjust the scrolling behavior as needed
      todayRef.current.scrollIntoView({
        behavior: 'smooth', // Optional: defines the transition animation
        block: 'center', // Vertically centers the element in the container
        inline: 'center', // Horizontally centers the element in the container
      });
    }


  }, [attendanceList]);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[currentMonth];
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const lastDayOfWeek = new Date(currentYear, currentMonth, daysInMonth).getDay();
  const daysFromNextMonthToAdd = 6 - lastDayOfWeek;
  const calendarDays = [];
  function subtractDays(days: number): string {
    const date = new Date(today);
    date.setDate(date.getDate() - days);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  const yesterday = subtractDays(1);
  const dayBeforeYesterday = subtractDays(2);
  const twoDaysBeforeYesterday = subtractDays(3);
  const threeDaysBeforeYesterday = subtractDays(4);
  const point = streakPoints[yesterday] && streakPoints[dayBeforeYesterday] && streakPoints[twoDaysBeforeYesterday] && streakPoints[threeDaysBeforeYesterday] ? 40 : streakPoints[yesterday] && streakPoints[dayBeforeYesterday] && streakPoints[twoDaysBeforeYesterday] ? 30 : streakPoints[yesterday] && streakPoints[dayBeforeYesterday] ? 20 : streakPoints[yesterday] ? 10 : 0

  let lastPoint = point
  const futurePoints = () => {
    if (lastPoint < 50) lastPoint += 10;
    return (lastPoint)
  }
  const prevMonthDay = new Date(currentYear, currentMonth, 0).getDate() - firstDayOfMonth + 1;
  for (let i = 0; i < firstDayOfMonth; i++) {
    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(prevMonthDay + i).padStart(2, '0')}`;
    const dateStrRender = `${String(currentMonth).padStart(2, '0')}-${String(prevMonthDay + i).padStart(2, '0')}`;
    const points = streakPoints[dateStr] || null;
    calendarDays.push(
      <div key={`prev-month-day-${prevMonthDay + i}`} className={`calendar-day prev-month ${!points && "missed"}`}>
        <p className="day">{prevMonthDay + i}</p>
        <p className="streak_calendar_day">{dateStrRender}</p>
        <div className="daily_point">
          {points ?
            <p className="point collected">+{points}</p> :
            <Image src={IconsFile.Missed} alt="" className="point_missed" />
          }
          <p className="text">{points ? "" : "Missed"}</p>
          <Button className="more">{points ? `${"Collected"}` : 'Missed'} </Button>
        </div>
      </div>
    );
  }
  const onClickCollect = async () => {
    try {
      setPending(true)
      const [data] = await createAttendance()
      if (!data.error) {
        fetchData()
      }
      setPending(false)
    } catch (error) {
      console.log(error)
    }
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dateStrRender = `${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const todayStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const isToday = dateStr === todayStr;
    const isPastOrToday = new Date(dateStr) < new Date(todayStr);
    const points = !isPastOrToday && futurePoints();
    calendarDays.push(
      <div key={day} ref={isToday ? todayRef : null} className={`calendar-day ${isToday ? 'today' : ''} ${!streakPoints[dateStr] && isPastOrToday && "missed"}`}>
        <p className="streak_calendar_day">{dateStrRender}</p>
        <p className="day">{day}</p>
        <div className="daily_point">
          {isPastOrToday ? (streakPoints[dateStr] ? (<p className={`point collected`}>{"+" + streakPoints[dateStr]} </p>) :
            (<Image src={IconsFile.Missed} alt="" className="point_missed" />)) : (<p className="point">{"+" + points}</p>)}

          <p className={`text ${isPastOrToday && streakPoints[dateStr] && "collected"}`}>   {isPastOrToday ? (streakPoints[dateStr] ? "" :
            "Missed") : (streakPoints[todayStr] && isToday ? "Collected" : "")}</p>
          {isPastOrToday ? (streakPoints[dateStr] ? (<Button className="more">Collected </Button>) :
            (<Button className="more">Missed </Button>)) : (<Button className="more" onClick={() => !streakPoints[todayStr] && isToday && onClickCollect()}>{streakPoints[todayStr] && isToday ? "Collected" : "Collect"}  </Button>)}
        </div>
      </div >
    );
  }

  for (let i = 1; i <= daysFromNextMonthToAdd; i++) {
    const nextMonthDay = i;
    const dateStr = `${currentYear}-${String(currentMonth + 2).padStart(2, '0')}-${String(nextMonthDay).padStart(2, '0')}`;
    const dateStrRender = `${String(currentMonth + 2).padStart(2, '0')}-${String(nextMonthDay).padStart(2, '0')}`;
    const points = streakPoints[dateStr] || '50';
    calendarDays.push(
      <div key={`next-month-day-${nextMonthDay}`} className="calendar-day next-month empty">
        <p className="day">{nextMonthDay}</p>
        <p className="streak_calendar_day">{dateStrRender}</p>
        <div className="daily_point">
          <p className="point">{points !== '50' ? `+${points}` : '+50'}</p>
          <Button className="more">{points !== '50' ? `${"Collected"}` : 'Collect'} </Button>
        </div>
      </div>
    );
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
                    <p>Login streak : {loginStreak} day</p>
                  </div>
                  <div className="check_in_calendar" onClick={() => setShowCalendar(true)}>
                    <Image src={IconsFile.Calendar} alt="" className="calendar_icon" />
                    <p className="text">my check-in calendar</p>
                  </div>
                </div>
                <div className="card_box"  >
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
