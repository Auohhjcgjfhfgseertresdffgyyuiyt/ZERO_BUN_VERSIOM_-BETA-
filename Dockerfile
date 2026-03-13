FROM oven/bun:1

RUN apt-get update && apt-get install -y \
    ffmpeg imagemagick git \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json ./
RUN bun install --production
COPY . .

RUN mkdir -p /app/database && chown -R 1000:1000 /app
USER 1000

EXPOSE 8080
CMD ["bun", "run", "src/index.js"]
