function loadSidebar() {
  var sidebarHTML = `<ul class="sidebar__list">
  <li>
    <a href="index.html">getting started</a>
    <ul>
      <li>
        <a href="index.html" >Introduction</a>
      </li>
      <li>
        <a href="build.html" >Serve & Build</a>
      </li>
    </ul>
  </li>
     <li>
      <a href="layout.html">layouts</a>
      <ul>
        <li>
          <a href="layout.html" >Layout System</a>
        </li>
        <li>
          <a href="largeSidebar.html" >Large Sidebar</a>
        </li>
         <li>
          <a href="compactSidebar.html" >Compact Sidebar</a>
        </li>
      </ul>
    </li>
  <li>
    <a href="variable.html">Sass</a>
    <ul>
      <li>
        <a href="variable.html">Variables</a>
      </li>
    </ul>
  </li>
  <li>
    <a href="color.html">Utilities</a>
    <ul>
      <li>
        <a href="color.html">Color</a>
      </li>
     
    </ul>
  </li>
  <li>
      <a href="#">Components</a>
      <ul>
        <li>
          <a target="_blank" href="https://bootstrap-vue.js.org/docs/components/alert">Alert</a>
        </li>
        <li>
          <a target="_blank" href="https://bootstrap-vue.js.org/docs/components/badge">Badge</a>
        </li>
        <li>
          <a target="_blank" href="https://bootstrap-vue.js.org/docs/components/breadcrumb">Breadcrumb</a>
        </li>
        <li>
          <a target="_blank" href="https://bootstrap-vue.js.org/docs/components/button">Button</a>
        </li>
        <li>
          <a target="_blank" href="https://bootstrap-vue.js.org/docs/components/form">Forms</a>
        </li>
        <li>
          <a target="_blank" href="https://bootstrap-vue.js.org/docs/components/pagination">Pagination</a>
        </li>
        <li>
          <a target="_blank" href="https://bootstrap-vue.js.org/docs/components/popover">Popover</a>
        </li>
        <li>
          <a target="_blank" href="https://bootstrap-vue.js.org/docs/components/progress">Progress</a>
        </li>
        <li>
          <a target="_blank" href="https://bootstrap-vue.js.org/docs/components/tabs">Tab</a>
        </li>
        <li>
          <a target="_blank" href="https://bootstrap-vue.js.org/docs/components/tooltip">Tooltip</a>
        </li>

        <li>
          <a target="_blank" href="https://bootstrap-vue.js.org/docs/components/spinner">Spinner</a>
        </li>

        <li>
          <a target="_blank" href="https://bootstrap-vue.js.org/docs/components/carousel">Carousel</a>
        </li>
        <li>
          <a target="_blank" href="https://bootstrap-vue.js.org/docs/components/dropdown">Dropdown</a>
        </li>
        <li>
          <a target="_blank" href="https://bootstrap-vue.js.org/docs/components/modal">Modal</a>
        </li>
        <li>
          <a target="_blank" href="https://bootstrap-vue.js.org/docs/components/toast">Toast</a>
        </li>
      </ul>
    </li>
 
</ul>

`;
  var $sidebar = $(".doc-content__sidebar").html(sidebarHTML);
  var path = window.location.pathname;
  var page = path.split("/").pop();

  console.log(path);

  $sidebar.find('.sidebar__list [href="' + page + '"]').addClass("active");
}
