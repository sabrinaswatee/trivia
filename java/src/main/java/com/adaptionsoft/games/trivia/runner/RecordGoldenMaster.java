
package com.adaptionsoft.games.trivia.runner;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.File;
import java.io.PrintWriter;
import java.io.PrintStream;
import java.util.stream.IntStream;

public class RecordGoldenMaster {

	private static void doSomething(Integer i) {
		PrintStream orgStream = System.out;
		try(PrintStream fileStream = new PrintStream(new FileOutputStream("src/test/resources/golden-master/output-" + i + ".txt", false))) {
			// Redirecting console output to file
			System.setOut(fileStream);
			GameRunner.main(new String[]{Integer.toString(i)});
		} catch (FileNotFoundException e) {
			throw new RuntimeException(e);
		} finally {
			System.setOut(orgStream);
		}
}


	public static void main(String[] args) {
		IntStream.range(0, 10).forEach(RecordGoldenMaster::doSomething);

	}
}
