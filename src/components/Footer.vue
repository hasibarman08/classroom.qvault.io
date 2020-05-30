<template>
  <div id="footer">
    <p>
      Thanks for learning with us! Be sure to follow our blog
      and social accounts for more educational content
    </p>
    <ul>
      <li>
        <a
          href="https://qvault.io"
          target="_blank"
          rel="noopener"
        >blog</a>
      </li>
      <li>
        <a
          href="https://twitter.com/q_vault"
          target="_blank"
          rel="noopener"
        >twitter</a>
      </li>
      <li>
        <a
          href="https://dev.to/wagslane"
          target="_blank"
          rel="noopener"
        >dev.to</a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/company/qvault"
          target="_blank"
          rel="noopener"
        >linkedin</a>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/colors.scss';

#footer {
  color: $black;
}

ul {
  list-style-type: none;
  padding: 0;
  text-align: center;
}

li {
  display: inline-block;
  margin: 0 10px;
}

p {
  text-align: center;
}
</style>
