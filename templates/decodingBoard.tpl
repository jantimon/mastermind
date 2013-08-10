<div class="score"></div>
<div class="solution">
  <% _.each(solution, function(peg) { %>
    <span class="peg color-<%= peg.get("color") %>"><%= peg.get("color") %></span>
  <% }); %>
</div>
<div class="tries">
  <% _.each(attempts, function(attempt) { %>
    <div class="attempt"></div>
  <% }); %>
</div>
<div class="pegs">
  <% _.each(pegColors, function(color) { %>
    <span class="peg <%= color %>"><%= color %></span>
  <% }); %>
</div>