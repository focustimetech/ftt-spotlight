<?php

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
    public static function userColor($index = -1) {
        if ($index && $index > 0 && $index < count(USER_COLORS)) {
            return USER_COLORS[$index];
        }
        return USER_COLORS[array_rand(USER_COLORS)];
    }

    /**
     * Returns a random Topic color string, unless an index is given.
     */
    public static function topicColor($index = -1) {
        return self::userColor($index);
    }
}