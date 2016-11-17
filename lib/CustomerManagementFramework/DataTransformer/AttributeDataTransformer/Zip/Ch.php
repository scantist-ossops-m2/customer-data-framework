<?php
/**
 * Created by PhpStorm.
 * User: mmoser
 * Date: 17.11.2016
 * Time: 11:46
 */

namespace CustomerManagementFramework\DataTransformer\AttributeDataTransformer\Zip;

use CustomerManagementFramework\DataTransformer\AttributeDataTransformer\AttributeDataTransformerInterface;

class Ch implements AttributeDataTransformerInterface
{
    public function transform($data)
    {
        preg_match("/\\b\\d{4}\\b/", $data, $matches);

        if($match = $matches[0]) {
            return $match;
        }

        return $data;
    }

}