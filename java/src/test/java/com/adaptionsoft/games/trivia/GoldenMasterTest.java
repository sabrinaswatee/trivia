package com.adaptionsoft.games.trivia;

import static org.junit.Assert.*;

import com.adaptionsoft.games.trivia.runner.GameRunner;
import org.junit.Test;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

public class GoldenMasterTest {

	@Test
	public void forSeed0() throws Exception {
		example(0);
	}

	@Test
	public void forSeed1() throws Exception {
		example(1);
	}

	@Test
	public void forSeed2() throws Exception {
		example(2);
	}

	@Test
	public void forSeed3() throws Exception {
		example(3);
	}

	@Test
	public void forSeed4() throws Exception {
		example(4);
	}

	@Test
	public void forSeed5() throws Exception {
		example(5);
	}

	@Test
	public void forSeed6() throws Exception {
		example(6);
	}

	@Test
	public void forSeed7() throws Exception {
		example(7);
	}

	@Test
	public void forSeed8() throws Exception {
		example(8);
	}

	@Test
	public void forSeed9() throws Exception {
		example(9);
	}

	private void example(int seed) throws Exception {
		String path = this.getClass().getClassLoader().getResource("golden-master/output-" + seed + ".txt").getPath();
		String goldenMaster = new String(Files.readAllBytes(Paths.get(path)));
		ByteArrayOutputStream outContent = new ByteArrayOutputStream();
		PrintStream orgStream = System.out;
		System.setOut( new PrintStream( outContent ) );
		GameRunner.main(new String[]{Integer.toString(seed)});
		System.setOut(orgStream);
		String actual = outContent.toString();
		assertEquals(actual, goldenMaster);
	}
}
