FROM hseeberger/scala-sbt:11.0.13_1.5.8_2.13.8

WORKDIR /app

COPY . .

RUN sbt clean compile stage

CMD ["./target/universal/stage/bin/backend-scala-akka"]

