<?php

namespace App\Http;

use DateTime;

const USER_COLORS = [
    'F44336',
    'E91E63',
    '9C27B0',
    '673AB7',
    '3F51B5',
    '2196F3',
    '03A9F4',
    '00BCD4',
    '009688',
    '4CAF50',
    '8BC34A',
    'CDDC39',
    'FFEB3B',
    'FFC107',
    'FF9800',
    'FF5722',
    '795548',
    '9E9E9E',
    '607D8B'
];

/**
 * Class for useful utility functions.
 */
class Utils {

    /**
     * Returns a random User color string, unless an index is given.
     */
    public static function userColor($index = -1)
    {
        if ($index && $index > 0 && $index < count(USER_COLORS)) {
            return USER_COLORS[$index];
        }
        return USER_COLORS[array_rand(USER_COLORS)];
    }

    /**
     * Returns a random Topic color string, unless an index is given.
     */
    public static function topicColor($index = -1)
    {
        return self::userColor($index);
    }

    /**
     * Determine the approximate time between a start and end time. By default,
     * the start time is the current server time, given by `time()`. A string
     * value of the approimate time is returned. e.g. 'in 5 hours'; '3 days ago'.
     */
    public static function approximateTime($start_time, $end_time = null)
    {
        if ($end_time === null) {
            $end_time = time();
        }
        $has_happened = $end_time > $start_time;
        $start_datetime = new DateTime(date('Y-m-d H:i:s', $start_time));
        $end_datetime = new DateTime(date('Y-m-d H:i:s', $end_time));
        $interval = date_diff($start_datetime, $end_datetime);
        $formats = [
            ["%y", 'year'],
            ["%m", 'month'],
            ["%d", 'day'],
            ["%h", 'hour'],
            ['%i', 'minute']
        ];
        foreach ($formats as $format) {
            $result = $interval->format($format[0]);
            if ($result) {
                $interval_string = "$result ". $format[1]. ($result > 1 ? 's' : '');
                $return = $has_happened ? "$interval_string ago" : "In $interval_string";
                return $return;
            }
        }
        return "Just now";
    }

    /**
     * Returns a formated date range from two time values.
     */
    public static function formatRangeString($start, $end) {
        $start_date = date('j', $start);
        $end_date = date('j', $end);
        $start_month = date('M', $start);
        $end_month = date('n', $start) < date('n', $end) ? date('M', $end) : "";
        $start_year = date('Y', $start) < date('Y', $end) ? date('Y', $start) : "";
        $end_year = date('Y', $end);
        return "$start_month $start_date". ($start_year ? ", $start_year" : ""). " - ". ($end_month ? "$end_month " : ""). "$end_date, $end_year";
    }
}
