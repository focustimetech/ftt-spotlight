import moment from 'moment'

import { getWeekTitle } from '../date'

/*
test('getDaysOfWeek should work for different starting days', () => {
    //
})
*/

test('getWeekTitle is formed properly', () => {
    let date: Date = moment('2020-01-11').toDate()
    expect(getWeekTitle(date)).toEqual('January 2020')
    date = moment('2020-02-28').toDate()
    expect(getWeekTitle(date)).toEqual('Feb - Mar 2020')
    date = moment('2020-03-24').toDate()
    expect(getWeekTitle(date)).toEqual('March 2020')
    date = moment('2020-12-30').toDate()
    expect(getWeekTitle(date)).toEqual('Dec 2020 - Jan 2021')
})
