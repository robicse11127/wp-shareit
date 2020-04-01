<?php
/**
 * Plugin Name: WP Shareit
 * Description: A social share plugin for wordpress
 * Version: 1.0.0
 * Author: Md. Rabiul Islam
 * License: GPLv3 or later
 * License URI: http://www.gnu.org/license/gpl-3.0.html
 * Text Domain: wp-shareit
 * Tags: Social share, share, share links, facebook share, twitter share, linkedin share
 */
if( ! defined( 'ABSPATH' ) ) exit(); // No direct access allowed

/**
* Require Autoloader
* @since 1.0.0
*/
require_once 'vendor/autoload.php';

use WPShareit\Admin\Admin;

final class WP_Shareit {

    /**
     * Define Plugin Version
     */
    const version = '1.0.0';

    /**
    * Construct Function
    * @since 1.0.0
    */
    private function __construct() {
        $this->plugin_constants();
        add_action( 'plugins_loaded', [ $this, 'init_plugin' ] );
    }

    /**
    * Define Plugin Constants
    * @since 1.0.0
    */
    public function plugin_constants() {
        define( 'WPSHAREIT_VERSION', self::version );
        define( 'WPSHAREIT_PLUGIN_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
        define( 'WPSHAREIT_PLUGIN_URL', trailingslashit( plugins_url( '/', __FILE__ ) ) );
    }

    /**
    * Singletone Instance
    * @since 1.0.0
    */
    public static function init() {
        static $instance = false;

        if( ! $instance ) {
            $instance = new self();
        }

        return $instance;
    }

    /**
    * Init Plugin
    * @since 1.0.0
    */
    public function init_plugin() {
        new Admin();
    }

}

/**
* Init The Main Plugin
* @since 1.0.0
*/
function wpshareit_initialize() {
    return WP_Shareit::init();
}

// Trigger the plugin
wpshareit_initialize();