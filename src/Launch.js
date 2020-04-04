import React from "react";

class Launch extends React.Component {
    constructor(props) {
        super(props);
        this.date = {date: null, isFull: false};
        if (props.launch.years !== null && props.launch.months !== null && props.launch.date !== null && props.launch.hours !== null && props.launch.minutes !== null) {
            this.date.date = new Date(props.launch.years, props.launch.months - 1, props.launch.date, props.launch.hours, props.launch.minutes);
            this.date.isFull = true;
        }
        this.state = {
            time: Date.now() - this.date.date
        };
    }

    componentDidMount() {
        if (this.date.isFull) {
            this.intervalId = setInterval(() => this.setState({time: Date.now() - this.date.date}), 5000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    _formatDateDifference() {
        let delta;
        let isLaunched = false;
        if (this.state.time > 0) {
            delta = Math.floor(this.state.time / 1000);
            isLaunched = true;
        } else {
            delta = Math.floor(-this.state.time / 1000);
        }
        let days = Math.floor(delta / 86400);
        delta -= days * 86400;
        let hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        let minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        let seconds = delta % 60;
        return {days, hours, minutes, seconds, isLaunched};
    }

    _formatDate(date) {
        function formatTwoDigitNumber(number) {
            return number !== null ? ('0' + number).slice(-2) : null
        }

        return `${
            date.years}${
            date.months !== null ? `/${formatTwoDigitNumber(date.months)}` : ''}${
            date.date !== null ? `/${formatTwoDigitNumber(date.date)}` : ''}${
            date.hours !== null ? ` ${formatTwoDigitNumber(date.hours)}` : ''}${
            date.minutes !== null ? `:${formatTwoDigitNumber(date.minutes)}` : ''}`;
    }

    static _numToString(n, text_forms) {
        n = Math.abs(n) % 100;
        let n1 = n % 10;
        if (n > 10 && n < 20) {
            return n.toString() + ' ' + text_forms[2];
        }
        if (n1 > 1 && n1 < 5) {
            return n.toString() + ' ' + text_forms[1];
        }
        if (n1 === 1) {
            return n.toString() + ' ' + text_forms[0];
        }
        return n.toString() + ' ' + text_forms[2];
    }

    render() {
        const {mission, vehicle, location} = this.props;
        let timer = 'Точное время не задано';
        const formattedDate = this._formatDate(this.props.launch);
        if (this.date.isFull) {
            const {days, hours, minutes, seconds, isLaunched} = this._formatDateDifference();
            timer = (isLaunched ? 'Прошло ' : 'Осталось ') +
                Launch._numToString(days, ['день', 'дня', 'дней']) + ', '+
                Launch._numToString(hours, ['час', 'часа', 'часов']) +', '+
                Launch._numToString(minutes, ['минута', 'минуты', 'минут']);
        }
        return (<tr>
            <td>{mission}</td>
            <td>{vehicle}</td>
            <td>{location}</td>
            <td>{formattedDate}</td>
            <td>{timer}</td>
        </tr>);
    }
}

export default Launch;
