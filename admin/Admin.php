<?php
namespace WPShareit\Admin;

use WPShareit\Admin\Modules\Share\FacebookShare;

class Admin {
    /**
    * Construct Function
    * @since 1.0.0
    */
    public function __construct() {
        // $this->init_modules();
        \add_filter( 'the_content', [ $this, 'share_content' ] );
        \add_action( 'wp_head', [ $this, 'add_meta_tags' ] );
    }

    /**
    * Add Meta Tgas
    * @since 1.0.0
    */
    public function add_meta_tags() {
        $facebook = new FacebookShare();
        echo $facebook->meta_tags();
    }

    /**
    * Init Required Classes
    * @since 1.0.0
    */
    public function share_content( $content ) {
        $facebook = new FacebookShare();
        if( is_single() ) {

            $content .= $facebook->share_link();
        }

        return $content;
    }

    /**
    * Init Scripts
    * @since 1.0.0
    */
    public function init_scripts() {

    }
}