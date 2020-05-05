<?php

namespace App;

use Arr;

/**
 * A basic class for utilities accessed using public static methods.
 */
class Utils
{
    /**
     * Prepares a full text query into a string that can be used in an `AGAINST` clause.
     */
    public static function prepareFullTextQuery(string $string)
    {
        $appendPlus = function ($word) {
            return "+$word";
        };

        return implode(' ', array_map($appendPlus, explode(' ', trim($string)))) . '*';
    }

    /**
     * Returns a random default color.
     */
    public static function randomColor()
    {
        $colors = ['F44336', 'E91E63', '9C27B0', '673AB7', '3F51B5', '2196F3', '03A9F4', '00BCD4', '009688',
        '4CAF50', '8BC34A', 'CDDC39', 'FFEB3B', 'FFC107', 'FF9800', 'FF5722', '795548', '9E9E9E', '607D8B'];

        return Arr::random($colors);
    }

    public static function sysAdminColor()
    {
        return '000';
    }

    /**
     * Grabs an app setting using the given key.
     * @param key The key to search by.
     * @return Setting The desired setting, or `null` if it can't be found.
     */
    public static function settings($key)
    {
        return Setting::find($key)->value;
    }
}
