# Golden Master

## Compile and run tests

```bash
mvn clean test
```

## Generate reference files

Create the target folder

```bash
mkdir -p src/test/resources/golden-master
```

Compile the code

```bash
mvn clean compile
```

Generate the files

```bash
java -cp target/classes/ com.adaptionsoft.games.trivia.runner.RecordGoldenMaster
```

## Run Golden Master tests

They are part of the JUnit suite

```bash
mvn test
```
