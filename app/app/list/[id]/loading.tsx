export default function Loading() {
	function randomInteger(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	return (
		<article className="mx-4 mb-10 mt-20 md:mx-20 md:mb-20 md:mt-28">
			{/* title section */}
			<div className="flex flex-col gap-y-3 md:gap-y-8">
				<div className="flex flex-row items-center gap-x-3 gap-y-8 md:flex-col md:items-start">
					{/* Icon */}
					<div className="h-[40px] w-[40px] animate-pulse rounded-lg bg-colorGray/50 md:my-2 md:h-[60px] md:w-[60px]"></div>

					{/* List name */}
					<div className="my-3 h-7 w-32 animate-pulse rounded-lg bg-colorGray/50 md:h-12 md:w-96" style={{ animationDelay: "90ms" }}></div>
				</div>

				{/* Add new task button */}
				<div className="flex animate-pulse items-center gap-x-3 rounded-lg bg-colorGray/20 px-3 py-2 md:py-2.5" style={{ animationDelay: "180ms" }}>
					<div className="h-5 w-5 rounded-md bg-colorGray/50 p-1 md:h-8 md:w-8" />
					<div className="h-4 w-3/4 rounded-md bg-colorGray/50 p-1 md:h-6" style={{ width: randomInteger(40, 90) + "%" }} />
				</div>
			</div>

			<div className="mt-8 flex flex-col gap-y-10 md:mt-16 md:gap-y-20">
				{[...Array(4)].map((x, i) => (
					<div className="flex flex-col gap-y-1" key={`${x}-${i}`}>
						{/* Task table title row */}
						<div className="flex animate-pulse flex-row items-center gap-x-3" style={{ animationDelay: (i + 1) * (90 + 350) + 180 + "ms" }}>
							<div className={`h-6 rounded-lg bg-colorGray/50 md:h-8`} style={{ width: randomInteger(15, 40) + "%" }}></div>

							<div className="h-4 w-3.5 rounded bg-colorGray/30 md:h-5 md:w-6"></div>

							{/* Spacer */}
							<div className="grow" />

							<div className="h-6 w-6 rounded-lg bg-colorGray/50 md:h-10 md:w-10"></div>
						</div>

						{/* Spacer */}
						<div className="my-1 h-px w-full bg-colorGray/20" />

						{/* Tasks */}
						<div className="flex flex-col gap-y-1">
							{[...Array(7)].map((x, j) => (
								<div
									className="taskTile animate-pulse bg-colorGray/5"
									key={`${x}-${j}`}
									style={{ animationDelay: (j + 1) * 50 + ((i + 1) * (90 + 350) + 180) + "ms" }}
								>
									{/* Checkbox */}
									<div className="my-2.5 h-5 w-5 rounded-md bg-colorGray/50"></div>

									{/* Title */}
									<div className={`h-4 rounded-md bg-colorGray/50 md:h-6`} style={{ width: randomInteger(10, 40) + "%" }}></div>

									{/* Date tile */}
									<div className="h-5 rounded-md bg-colorGray/30" style={{ width: randomInteger(8, 12) / 4 + "rem" }}></div>

									{/* Spacer */}
									<div className="grow" />

									<div className="h-3.5 w-3.5 rounded bg-colorGray/30 md:h-4 md:w-4"></div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</article>
	);
}
