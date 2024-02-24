const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  
export default function useFormattedDate(date: Date){
    return new Intl.DateTimeFormat("en-US", options).format(date)
}