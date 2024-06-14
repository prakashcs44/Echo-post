export const timeAgo = (date) => {
    const year = 365 * 24 * 60 * 60 * 1000;
    const month = 30 * 24 * 60 * 60 * 1000;
    const day = 24 * 60 * 60 * 1000;
    const hour = 60 * 60 * 1000;
    const minute = 60 * 1000;
    const second = 1000; 
    const type = [
      { text: "second", val: second },
      { text: "minute", val: minute },
      { text: "hour", val: hour },
      { text: "day", val: day },
      { text: "month", val: month },
      { text: "year", val: year },
    ];
    const timePassed = Date.now() - new Date(date).getTime();
    let curr = type[0];
  
    for (const t of type) {
      if (timePassed < t.val) break;
      curr = t;
    }
  
    const count = Math.floor(timePassed / curr.val);
    const unit = curr.text + (count > 1 ? "s" : "");
  
    return `${count} ${unit} ago`;
  };
  
  
export const dayMonthYear = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };