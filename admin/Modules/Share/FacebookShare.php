<?php
namespace WPShareit\Admin\Modules\Share;

class FacebookShare {

    /**
    * Consturct Function
    * @since 1.0.0
    */
    public function __construct() {

    }

    /**
    * Head meta tags for Facebook
    * @since 1.0.0
    */
    public function meta_tags() {
        global $post;
        ob_start();
        $content = '';
        ?>
        <meta property="og:title" content="<?php echo get_the_title( $post->ID ); ?>">
        <meta property="og:description" content="<?php echo get_the_excerpt( $post->ID ); ?>">
        <meta property="og:image" content="<?php echo get_the_post_thumbnail_url( $post->idate, 'full' ); ?>">
        <meta property="og:url" content="<?php echo get_the_permalink( $post->ID ); ?>">
        <meta name="twitter:card" content="summary_large_image">

        <meta property="fb:app_id" content="533485510642327" />
        <?php
        $content = ob_get_contents();
        ob_end_clean();

        return $content;
    }

    /**
    * Facebook Share Link
    * @since 1.0.0
    */
    public function share_link() {
        ob_start();
        $content = '';
        ?>
        <a class="share-btn" href="https://twitter.com/intent/tweet?url=<?php the_permalink(); ?>" target="_blank">Twitter</a>
        <!-- <p><a class="share-btn" href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>" target="_blank">facebook</i></a></p> -->
        <?php
        $content = ob_get_contents();
        ob_end_clean();

        return $content;
    }

}