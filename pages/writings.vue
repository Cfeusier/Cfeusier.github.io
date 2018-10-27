<template>
  <section>
    <h1 :class="titleClass">Collected Writings</h1>
    <v-card tile class="mt-4 mb-2" id="#toc">
      <stripes />
      <v-card-title class="display-1 p-text">Topics</v-card-title>
      <v-card-text>
        <v-btn flat href="#iqs" class="text-capitalize" outline>Popular Interview Questions</v-btn>
        <v-btn flat href="#tech" class="text-capitalize" outline>Technology</v-btn>
      </v-card-text>
    </v-card>
    <v-layout row>
      <h2 :class="['py-3', subtitleClass]" id="iqs">Popular Interview Question Series</h2>
      <v-btn flat icon large color="primary" href="#toc" class="my-3">
        <v-icon>open_in_browser</v-icon>
      </v-btn>
    </v-layout>
    <v-expansion-panel popout>
      <v-expansion-panel-content
        lazy
        ripple
        v-for="post in interviewQuestionPosts"
        :key="post.title">
        <div slot="header">{{ post.title }}</div>
        <v-card>
          <v-card-text>{{ post.description }}</v-card-text>
          <v-card-actions>
            <v-btn flat color="primary" nuxt :href="post.ref">Read</v-btn>
          </v-card-actions>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-layout row>
      <h2 :class="['py-3', subtitleClass]" id="tech">Technology</h2>
      <v-btn flat icon large color="primary" href="#toc" class="my-3">
        <v-icon>open_in_browser</v-icon>
      </v-btn>
    </v-layout>
    <v-expansion-panel popout>
      <v-expansion-panel-content
        lazy
        ripple
        v-for="post in techPosts"
        :key="post.title">
        <div slot="header">{{ post.title }}</div>
        <v-card>
          <v-card-text>{{ post.description }}</v-card-text>
          <v-card-actions>
            <v-btn flat color="primary" nuxt :href="post.ref">Read</v-btn>
          </v-card-actions>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!--
    <h2>JavaScript</h2>
    <ul>
      <li><a href="/2015/09/18/bindall-helper" target="_blank">Helper Function <em>.bindAll</em></a></li>
      <li><a href="/2015/09/15/underramdash-helpers" target="_blank">Underramdash.js: the Usual Utility Functions in 2kb, Unminified</a></li>
      <li><a href="/2015/09/08/function-prototype-bind-polyfill-coffeescript" target="_blank">CoffeeScript Polyfill for Function.prototype.bind</a></li>
      <li><a href="http://raghuvirkasturi.com/2015/04/14/guest-post-object-prototype-valueof-coercion-and-comparison-hackery-in-javascript/" target="_blank">Object.prototype.valueOf, Coercion, and Comparison Hackery in JavaScript</a></li>
      <li><a href="/2015/02/19/variable-hoisting-function-hoisting-javascript" target="_blank">Variable Hoisting and Function Hoisting in JavaScript</a></li>
      <li><a href="/2014/12/12/object-oriented-javascript-functional-class" target="_blank">Object-Oriented JavaScript - Functional Class Pattern</a></li>
      <li><a href="/2014/12/12/object-oriented-javascript-functional-shared-class" target="_blank">Object-Oriented JavaScript - Shared Functional Class Pattern</a></li>
      <li><a href="/2014/12/13/object-oriented-javascript-prototypal-class" target="_blank">Object-Oriented JavaScript - Prototypal Class Pattern</a></li>
      <li><a href="/2014/12/14/object-oriented-javascript-pseudo-classical-class" target="_blank">Object-Oriented JavaScript - Pseudo-Classical Class Pattern</a></li>
    </ul>
    <h2>Data Structures</h2>
    <ul>
      <li><a href="/2015/01/04/tree-data-structure-simple-binary-search-decision" target="_blank">Rollin' Trees, yo</a></li>
    </ul>
    <h2>Unix to Know this Command Series</h2>
    <ul>
      <li><a href="/2015/04/14/unix-to-know-this-command-reverse-i-search" target="_blank">Reverse-i-Search with CTRL-R</a></li>
      <li><a href="/2015/09/12/unix-to-know-this-command-sed-printing-streams-sed-n-p" target="_blank">Printing from Streams with <em><strong>sed -n '/pattern/p' file</strong></em></a></li>
    </ul>
    <h2>Web Security</h2>
    <ul>
      <li><a href="/2015/09/07/browser-security-xss-csrf-injection-safety" target="_blank">An Introduction to Injection, XSS, CSRF, and Practicing Safe Security</a></li>
    </ul>
    -->
  </section>
</template>

<script>
import { interviewQuestionPosts } from '~/assets/constants/interview_questions';
import { techPosts } from '~/assets/constants/tech_posts';
import Stripes from '~/components/Stripes.vue';
import { mapState } from 'vuex';

export default {
  components: { Stripes },
  mounted () { this.$store.commit('toggleLoading', false); },
  computed: mapState(['isMobile', 'titleClass', 'subtitleClass']),
  data () {
    return {
      interviewQuestionPosts,
      techPosts,
    };
  }
}
</script>

