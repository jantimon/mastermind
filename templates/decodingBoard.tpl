<div class="score"></div>
<div class="solution">
  <% _.each(solution, function(peg) { %>
    <span class="peg color-<%= peg.get("color") %>"><%= peg.get("color") %></span>
  <% }); %>
</div>
<div class="guessRows">
  <% _.each(_.range(guessCount), function(guess) { %>
    <div class="guess">
    </div>
  <% }); %>
</div>
<div class="pegColors">
  <% _.each(pegColors, function(color) { %>
    <span class="peg <%= color %>"><%= color %></span>
  <% }); %>
</div>