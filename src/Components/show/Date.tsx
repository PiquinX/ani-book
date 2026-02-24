export const Date = ({ date }: { date: string }) => {
    const JSDate = globalThis.Date;
    const parsedDate = new JSDate(date);

    if (isNaN(parsedDate.getTime())) {
        const dateSplit = date.split(' ')
        if (dateSplit.length < 4) {
            return <span className='font-semibold'>{dateSplit[0]}</span>
        }
        return (
            <span className='font-semibold'>
                {dateSplit[2] + ' ' + dateSplit[1].toLowerCase() + ' ' + dateSplit[3]}
            </span>
        )
    }

    const day = parsedDate.getDate();
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const month = monthNames[parsedDate.getMonth()];
    const year = parsedDate.getFullYear();

    return (
        <span className='font-semibold'>
            {`${day} ${month} ${year}`}
        </span>
    )
}
